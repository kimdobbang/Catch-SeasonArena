package com.catchcatch.main.domains.item.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Description {

    MAPLE("단풍나무는 가을이 되면 잎이 빨갛고 노랗게 물들어요. 바람이 불면 이 예쁜 단풍잎들이 떨어지며 길을 아름답게 덮어요. 우리나라의 가을을 상징하는 나무 중 하나랍니다."),
    PUMPKINS("잭오랜턴은 가을의 대표적인 축제인 할로윈에서 볼 수 있는 호박등이에요. 호박을 파서 무서운 얼굴을 만들고 안에 촛불을 켜면 귀신을 쫓아준다고 해요."),
    PINECONE("솔방울은 가을에 소나무에서 떨어지는 작은 열매예요. 솔방울은 마르면 비가 올 때 다시 오므려지는 특이한 특징을 가지고 있어요. 가을 숲길을 걷다 보면 솔방울을 자주 볼 수 있답니다."),
    DRAGONFLY("잠자리는 가을 하늘에서 빠르게 날아다니며 먹이를 잡는 곤충이에요. 가을이 되면 잠자리를 쉽게 볼 수 있는데, 가끔은 손에 잠자리를 앉히는 것도 가능해요. 잠자리는 날개가 아주 얇고 투명해서 빛에 반짝거려요."),
    COSMOS("코스모스는 가을의 바람을 타고 흔들리는 예쁜 꽃이에요. 다양한 색깔의 코스모스가 피어나 가을 들판을 아름답게 만들어요. 코스모스는 가을에 피는 대표적인 꽃으로 많은 사람들이 사랑한답니다."),
    BEAR("곰은 가을이 되면 겨울잠을 준비하기 위해 먹이를 많이 먹어요. 겨울에는 먹을 것이 적어서, 가을 동안 몸에 지방을 충분히 쌓아야 해요. 그래서 곰들은 가을에 특히 더 열심히 먹이를 찾고 먹는답니다."),
    DDUGI("가을 들판에서 메뚜기는 높이 점프를 하며 바쁘게 움직여요. 메뚜기는 매우 강한 뒷다리를 가지고 있어서 다른 곤충들보다 멀리 점프할 수 있답니다. 가을이 되면 메뚜기가 많이 보이기 때문에 쉽게 찾을 수 있어요."),
    MUSHROOM("가을이 되면 숲속에서 다양한 종류의 버섯이 자라나요. 버섯은 비가 온 후에 더 잘 자라기 때문에 가을 장마가 끝나고 나면 숲에서 버섯을 찾을 수 있어요. 일부 버섯은 먹을 수도 있지만, 독버섯은 조심해야 해요!"),
    CORN("가을 들판에서는 옥수수가 황금빛으로 익어갑니다. 옥수수는 가을에 수확하는 대표적인 작물 중 하나예요. 옥수수로 만든 음식은 맛있고 건강에도 좋아요."),
    SQUIRREL("다람쥐는 가을이 되면 겨울을 대비해 도토리를 열심히 모아요. 다람쥐는 매우 빠르게 움직이기 때문에 도토리를 찾는 것이 쉽지 않아요. 가을에 다람쥐를 보면 도토리를 저장하는 모습이 귀여워요."),
    MOON("가을 밤하늘을 밝히는 보름달은 매우 크고 환해요. 보름달이 뜨는 가을 밤에는 달빛 덕분에 밤에도 밖을 잘 볼 수 있어요. 가을이 깊어질수록 밤하늘은 더욱 맑아져서 달을 보기가 더 좋답니다."),
    SCARECROW("가을 들판에서 허수아비는 농작물을 지키기 위해 만들어져요. 새들이 허수아비를 보고 놀라서 농작물을 먹지 않게 돼요. 가을 추수가 끝날 때까지 허수아비는 그 자리를 지킨답니다.");

    private final String description;

    @Override
    public String toString() {
        return description;
    }
}
