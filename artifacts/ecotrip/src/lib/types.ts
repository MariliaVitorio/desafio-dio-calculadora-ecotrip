export const TripModal = {
  walking: "walking",
  bicycle: "bicycle",
  motorcycle: "motorcycle",
  car_gasoline: "car_gasoline",
  car_ethanol: "car_ethanol",
  car_electric: "car_electric",
  bus: "bus",
  train: "train",
  metro: "metro",
  airplane: "airplane",
} as const;

export type TripModal = (typeof TripModal)[keyof typeof TripModal];
