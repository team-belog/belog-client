interface PostLogLikeButtonProps {
  likeCount: number;
  likedByMe: boolean;
  onLike?: () => void;
}

function HeartIcon({ color }: { color: string }) {
  return (
    <svg width="25.1597" height="22.113" viewBox="0 0 25.1597 22.113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.74733 1.84095C4.4854 1.84095 1.84095 4.4854 1.84095 7.74733C1.84095 13.6537 8.82122 19.0232 12.5798 20.2721C16.3384 19.0232 23.3187 13.6537 23.3187 7.74733C23.3187 4.4854 20.6743 1.84095 17.4123 1.84095C15.4149 1.84095 13.6483 2.83269 12.5798 4.35063C12.0351 3.57495 11.3115 2.94191 10.4704 2.50506C9.6292 2.06821 8.69517 1.84042 7.74733 1.84095Z"
        fill={color}
        stroke={color}
        strokeWidth="3.6819"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PostLogLikeButton({ likeCount, likedByMe, onLike }: PostLogLikeButtonProps) {
  const activeColor = "#49D4B6";
  const inactiveColor = "#f8f8f8";
  const color = likedByMe ? activeColor : inactiveColor;

  return (
    <button
      type="button"
      onClick={onLike}
      className={`flex items-center gap-[8px] rounded-[30px] border bg-[rgba(255,255,255,0.21)] px-[15px] py-[10px] ${likedByMe ? "border-[#49D4B6]" : "border-[#f7f8f9]"}`}
    >
      <span className="pretendard-m-16 whitespace-nowrap text-[#f8f8f8]">좋아요</span>
      <div className="flex items-end gap-[3px]">
        <HeartIcon color={color} />
        <span
          className="pretendard-m-18 whitespace-nowrap [text-shadow:0px_0px_7px_rgba(0,0,0,0.05)]"
          style={{ color }}
        >
          {likeCount}
        </span>
      </div>
    </button>
  );
}
