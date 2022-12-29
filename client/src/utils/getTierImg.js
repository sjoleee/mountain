import Bronze from "@/assets/ranking/ranking1.png";
import Silver from "@/assets/ranking/ranking2.png";
import Gold from "@/assets/ranking/ranking5.png";
import Platinum from "@/assets/ranking/ranking4.png";
import Diamond from "@/assets/ranking/ranking3.png";
import Umm from "@/assets/ranking/ranking6.png";

function getTierImg(tiername) {
  switch (tiername) {
    case "브론즈":
      return Bronze;
    case "실버":
      return Silver;
    case "골드":
      return Gold;
    case "플래티넘":
      return Platinum;
    case "다이아":
      return Diamond;
    case "엄홍길":
      return Umm;
  }
}

export default getTierImg;
