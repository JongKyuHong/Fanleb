package a107.fanleb.domain.users;

import a107.fanleb.api.response.ranking.RankingListViewRes;
import a107.fanleb.api.response.users.QUserViewRes;
import a107.fanleb.api.response.users.UserViewRes;
import a107.fanleb.domain.subscribe.QSubscribe;
import a107.fanleb.domain.usersCategory.QUsersCategory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class UsersRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;
    QUsers qUsers = QUsers.users;
    QUsersCategory qUsersCategory = QUsersCategory.usersCategory;
    QSubscribe qSubscribe = QSubscribe.subscribe;

    public Page<UserViewRes> showList(Pageable pageable, String query, String userAddress) {
        BooleanBuilder builder = new BooleanBuilder();

        if (!(query == null) && !query.isEmpty()) {
            builder.and(qUsers.nickname.contains(query));
        }

        BooleanBuilder builder2 = new BooleanBuilder();

        if (!(userAddress == null) && !userAddress.isEmpty()) {
            builder2.and(qSubscribe.fromUserAddress.eq(userAddress));
        } else{
            builder2.and(qSubscribe.fromUserAddress.eq(""));
        }


        //데이터 가져옴
        JPAQuery<UserViewRes> fetch = jpaQueryFactory.select(new QUserViewRes(qUsers.id, qUsers.nickname, qUsers.userDescription, qUsers.usersCategory, qUsers.imgUrl, qUsers.userAddress, qUsers.maxSubscribeCnt, qUsers.curSubscribeCnt, qUsers.contentsCnt, qSubscribe.isNotNull()))
                .from(qUsers)
                .leftJoin(qUsersCategory).on(qUsers.usersCategory.eq(qUsersCategory))
                .leftJoin(qSubscribe).on(qUsers.userAddress.eq(qSubscribe.toUserAddress).and(builder2))
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()).distinct();

        //정렬
        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder(qUsers.getType(), qUsers.getMetadata());
            fetch.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                    pathBuilder.get(o.getProperty())));
        }

        List<UserViewRes> list = fetch.fetch();

        //count만 가져옴
        JPAQuery<Users> count = jpaQueryFactory.select(qUsers)
                .from(qUsers)
                .leftJoin(qUsersCategory).on(qUsers.usersCategory.eq(qUsersCategory))
                .leftJoin(qSubscribe).on(qUsers.userAddress.eq(qSubscribe.fromUserAddress))
                .where(builder);

        return PageableExecutionUtils.getPage(list, pageable, () -> count.fetchCount());
    }

}
