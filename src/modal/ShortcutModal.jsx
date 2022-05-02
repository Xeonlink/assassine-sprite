import Box from "@/component/Box";
import IcoButton from "../component/IcoButton";
import IMG_CLOSE from "@/img/cross50.svg";

export default function ShortcutModal({ closeSelf }) {
  return (
    <Box base="article" className="shortcut-modal">
      <header>단축키</header>

      <IcoButton
        type="button"
        src={IMG_CLOSE}
        alt="단축키 도움말 닫기"
        onClick={closeSelf}
      />

      <div className="shortcut-info">저장화면 토글</div>
      <div>ctrl s</div>

      <div className="shortcut-info">저장화면 토글</div>
      <div>ctrl S ( ctrl shift s )</div>

      <div className="shortcut-info">프리뷰 확대 (+1)</div>
      <div>ctrl =</div>

      <div className="shortcut-info">프리뷰 축소 (-1)</div>
      <div>ctrl -</div>

      <div className="shortcut-info">프리뷰 확대 (+10)</div>
      <div>ctrl + ( ctrl shift = )</div>

      <div className="shortcut-info">프리뷰 축소 (-10)</div>
      <div>ctrl _ ( ctrl shift - )</div>

      <div className="shortcut-info">열 추가 (+1)</div>
      <div>ctrl .</div>

      <div className="shortcut-info">열 축소 (-1)</div>
      <div>ctrl ,</div>

      <div className="shortcut-info">열 추가 (+2)</div>
      <div>ctrl &gt; ( ctrl shift . )</div>

      <div className="shortcut-info">열 축소 (-2)</div>
      <div>ctrl &lt; ( ctrl shift , )</div>

      <div className="shortcut-info">단축키 도움말 토글</div>
      <div>? ( shift / )</div>
    </Box>
  );
}
