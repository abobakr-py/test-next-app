const PriceRangeSlider = ({ price, setPrice }) => {
  return (
    <div className="mx-auto">
      <div className="relative w-full">
        <input
          type="range"
          min="0.001"
          max="0.999"
          step="0.001"
          value={price || 0.001}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="slider-thumb w-full my-4"
        />
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 rounded">
          <div
            className="h-full bg-yellow-500 rounded"
            style={{
              width: `${((price || 0.001 - 0.001) / (0.999 - 0.001)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="text-[#4c4c4c] text-xs leading-[0.65rem] flex items-center justify-between">
        <p> Min : 0.001 Gm</p>
        <p>Max : 0.999 Gm</p>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
