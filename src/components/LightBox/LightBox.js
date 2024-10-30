import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./LightBox.scss";
function LightBox({ openLightBox, productDetail, setOpenLightBox = {} }) {
  const slides = productDetail[0]?.subImage.map((image) => ({
    src: image.src,
    width: 3840,
    height: 2560,
    imageFit: "contain",
  }));

  return (
    <Lightbox
      open={openLightBox}
      close={() => setOpenLightBox(false)}
      plugins={[Thumbnails, Counter, Download, Share, Fullscreen, Zoom]}
      thumbnails={{ position: "bottom" }}
      counter={true}
      download={true}
      animation={{ zoom: 300 }}
      zoom={{
        maxZoomPixelRatio: "2",
        zoomInMultiplier: "2",
        scrollToZoom: false,
      }}
      share={true}
      slides={slides}
    ></Lightbox>
  );
}

export default LightBox;
