import Image from "next/image";

const Book = ({ src }: { src: string }) => {
  return (
    <div className="flip-card w-10">
      <div className="card-shell">
        <div className="flip-page-left"></div>
        <div className="flip-page-right"></div>
        <div className="flip-cover clickable-card">
          {/* <img width="210px" height="297px" alt="Thumb Example" src={src} /> */}
          <Image
            src={src}
            alt="sidebar item img"
            width={40}
            height={48}
            priority
            className="w-10 h-12 object-cover rounded-sm overflow-hidden"
          />
          {/* <div className="read-label"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Book;
