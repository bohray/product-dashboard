const Star = ({ fill }) => {
  return (
    <div className="relative w-5 h-5">
      {/* Empty star */}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-gray-300"
        fill="currentColor"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 1.48 8.27L12 18.896l-7.416 4.521 1.48-8.27L0 9.306l8.332-1.151z" />
      </svg>

      {/* Filled star */}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.841 1.48 8.27L12 18.896l-7.416 4.521 1.48-8.27L0 9.306l8.332-1.151z" />
        </svg>
      </div>
    </div>
  );
};

const Rating = ({ value }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        let fill = 0;
        if (value >= star) fill = 1;
        else if (value >= star - 0.5) fill = 0.5;

        return <Star key={star} fill={fill} />;
      })}
    </div>
  );
};

export default Rating;
