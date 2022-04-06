package a107.fanleb.domain.subscribe;

import a107.fanleb.api.response.collections.CollectionsListViewRes;
import a107.fanleb.domain.users.QUsers;
import a107.fanleb.domain.users.Users;
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
public class SubscribeRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;
    QSubscribe qSubscribe = QSubscribe.subscribe;
    QUsers qUsers = QUsers.users;

    public Page<Users> findByFromUserAddress(Pageable pageable, String userAddress){
        List<Users> fetch = jpaQueryFactory.select(qUsers).from(qSubscribe).leftJoin(qUsers).on(qSubscribe.toUserAddress.eq(qUsers.userAddress)).where(qSubscribe.fromUserAddress.eq(userAddress)).fetch();

        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), fetch.size());

        if(start > fetch.size())
            return new PageImpl<>(new ArrayList<>(), pageable, fetch.size());
        else
            return new PageImpl<>(fetch.subList(start, end), pageable, fetch.size());

    }

    public Page<Users> findByToUserAddress(Pageable pageable, String userAddress){
        List<Users> fetch = jpaQueryFactory.select(qUsers).from(qSubscribe).leftJoin(qUsers).on(qSubscribe.fromUserAddress.eq(qUsers.userAddress)).where(qSubscribe.toUserAddress.eq(userAddress)).fetch();

        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), fetch.size());

        if(start > fetch.size())
            return new PageImpl<>(new ArrayList<>(), pageable, fetch.size());
        else
            return new PageImpl<>(fetch.subList(start, end), pageable, fetch.size());

    }
}
