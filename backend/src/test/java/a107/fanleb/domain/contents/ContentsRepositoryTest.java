package a107.fanleb.domain.contents;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@SpringBootTest
class ContentsRepositoryTest {

    @Autowired
    private ContentsRepository contentsRepository;

//    @BeforeEach
//    void setup(){
//
//    }

    @Test
    void update() {
        //given
        Contents content = Contents.builder().imgUrl("imgUrl").contentTitle("제목").contentDescription("설명").collection("콜렉션").ownerAddress("주소").build();

        Contents contentEntity = contentsRepository.save(content);

        //when
        contentsRepository.update(12, "주소", contentEntity.getId());

        //then
        assertThat(contentEntity.getOwnerAddress()).isEqualTo("주소");

    }
}