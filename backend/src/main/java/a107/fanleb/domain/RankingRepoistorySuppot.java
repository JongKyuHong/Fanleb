package a107.fanleb.domain;

import a107.fanleb.api.response.ranking.QRankingListViewRes;
import a107.fanleb.api.response.ranking.RankingListViewRes;
import a107.fanleb.domain.contents.QContents;
import a107.fanleb.domain.sales.QSales;
import a107.fanleb.domain.subscribe.QSubscribe;
import a107.fanleb.domain.users.QUsers;
import a107.fanleb.domain.usersCategory.QUsersCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class RankingRepoistorySuppot {
    private final JPAQueryFactory jpaQueryFactory;
    QUsers qUsers = QUsers.users;
    QUsersCategory qUsersCategory = QUsersCategory.usersCategory;
    QSales qSales = QSales.sales;
    QContents qContents = QContents.contents;

    
    public Page<RankingListViewRes> view(Pageable pageable) {
        List<RankingListViewRes> fetch = jpaQueryFactory.select(new QRankingListViewRes(qUsers.nickname, qUsersCategory.userCategoryName, qUsers.curSubscribeCnt, qUsers.contentsCnt, qSales.price.max(), qSales.count().intValue(), qUsers.imgUrl))
                .from(qUsers)
                .leftJoin(qUsersCategory).on(qUsers.usersCategory.eq(qUsersCategory))
                .leftJoin(qContents).on(qContents.ownerAddress.eq(qUsers.userAddress))
                .leftJoin(qSales).on(qSales.tokenId.eq(qContents.tokenId).and(qSales.saleYn.eq(Status.y)))
                .groupBy(qUsers).orderBy(qUsers.curSubscribeCnt.desc())
                .offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();

        int id = (int) pageable.getOffset()+1;

        for (RankingListViewRes r :
                fetch) {
            r.setId(id);
            id++;
        }


        return new PageImpl<>(fetch, pageable, fetch.size());
    }
}
