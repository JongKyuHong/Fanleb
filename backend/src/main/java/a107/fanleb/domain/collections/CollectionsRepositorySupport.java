package a107.fanleb.domain.collections;

import a107.fanleb.api.response.collections.CollectionsListViewRes;
import a107.fanleb.api.response.collections.QCollectionsListViewRes;
import a107.fanleb.domain.contents.QContents;
import a107.fanleb.domain.users.QUsers;
import com.querydsl.core.BooleanBuilder;
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
public class CollectionsRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;
    QCollections qCollections = QCollections.collections;
    QUsers qUsers = QUsers.users;
    QContents qContents = QContents.contents;

    //카테고리
    //검색
    //페이징
    public Page<CollectionsListViewRes> findBySortedBy(Pageable pageable, String query, String sortedBy) {
        if("singer".equals(sortedBy)) sortedBy="가수";
        else if("actor".equals(sortedBy)) sortedBy="배우";
        else if("celeb".equals(sortedBy)) sortedBy="셀럽";
        else if("general".equals(sortedBy)) sortedBy="일반인";

        BooleanBuilder builder = new BooleanBuilder();

        if(query!=null && !query.isEmpty()){
            builder.and(qCollections.collectionName.contains(query));
        }

        if(query!=null && !sortedBy.isEmpty()){
            builder.and(qUsers.usersCategory.userCategoryName.eq(sortedBy));
        }

        List<CollectionsListViewRes> fetch = jpaQueryFactory.select(new QCollectionsListViewRes(qCollections.id, qCollections.collectionName, qUsers.userAddress, qUsers.nickname, qContents.imgUrl.max())).from(qCollections).leftJoin(qContents).on(qCollections.eq(qContents.collection)).leftJoin(qUsers).on(qCollections.userAddress.eq(qUsers.userAddress)).groupBy(qCollections).where(builder).orderBy(qCollections.id.desc()).fetch();

        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), fetch.size());

        if(start > fetch.size())
            return new PageImpl<>(new ArrayList<>(), pageable, fetch.size());
        else
            return new PageImpl<>(fetch.subList(start, end), pageable, fetch.size());


    }

}
