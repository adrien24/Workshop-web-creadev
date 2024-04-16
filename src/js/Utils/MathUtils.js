export const randomRange = (min, max) => {
  const min_ = max < min ? max : min;
  const max_ = min > max ? min : max;
  return Math.random() * (max_ - min_) + min_;
};

export const deg2rad = (deg) => (deg * Math.PI) / 180;

export const distance2d = (x1, y1, x2, y2) => {
  const dx_ = x2 - x1;
  const dy_ = y2 - y1;
  return Math.hypot(dx_, dy_);
};
