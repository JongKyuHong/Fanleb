package a107.fanleb.domain;

import a107.fanleb.api.response.ranking.QRankingListViewRes;
import a107.fanleb.api.response.ranking.RankingListViewRes;
import a107.fanleb.domain.contents.QContents;
import a107.fanleb.domain.sales.QSales;
import a107.fanleb.domain.subscribe.QSubscribe;
import a107.fanleb.domain.users.QUsers;
import a107.fanleb.domain.usersCategory.QUsersCategory;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class RankingRepoistorySuppot {
    private final JPAQueryFactory jpaQueryFactory;
    QUsers qUsers = QUsers.users;
    QUsersCategory qUsersCategory = QUsersCategory.usersCategory;
    QSales qSales = QSales.sales;
    QContents qContents = QContents.contents;

    //subscriptionCnt, contentsCnt, maxTradedPrice, ownerCnt

    public Page<RankingListViewRes> view(Pageable pageable, String sortedBy) {
        JPAQuery<RankingListViewRes> query = jpaQueryFactory.select(new QRankingListViewRes(qUsers.nickname, qUsersCategory.userCategoryName, qUsers.curSubscribeCnt, qUsers.contentsCnt, qSales.price.max(), qSales.count().intValue(), qUsers.imgUrl))
                .from(qUsers)
                .leftJoin(qUsersCategory).on(qUsers.usersCategory.eq(qUsersCategory))
                .leftJoin(qContents).on(qContents.ownerAddress.eq(qUsers.userAddress))
                .leftJoin(qSales).on(qSales.tokenId.eq(qContents.tokenId).and(qSales.saleYn.eq(Status.y)))
                .groupBy(qUsers);

        if ("subscription_cnt".equals(sortedBy))
            query.orderBy(qUsers.curSubscribeCnt.desc());
        else if ("contents_cnt".equals(sortedBy))
            query.orderBy(qUsers.contentsCnt.desc());
        else if ("max_traded_price".equals(sortedBy))
            query.orderBy(qSales.price.max().desc());
        else if ("owner_cnt".equals(sortedBy))
            query.orderBy(qSales.count().desc());

        List<RankingListViewRes> fetch = query.fetch();


        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), fetch.size());

        if (start > fetch.size())
            return new PageImpl<>(new ArrayList<>(), pageable, fetch.size());
        else {
            int id = (int) pageable.getOffset() + 1;
            List<RankingListViewRes> sub = fetch.subList(start, end);

            for (RankingListViewRes r :
                    sub) {
                r.setId(id);
                id++;
            }


            return new PageImpl<>(sub, pageable, fetch.size());

        }
    }
}
