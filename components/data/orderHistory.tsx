// src/data/orderHistory.ts
export type HistoryDish = {
  id: string;
  title: string;
  weight: string;     // "150/40 гр."
  price: number;      // 650
  image: any;         // require(...)
};

export type HistoryOrder = {
  id: string;
  restaurantLogo: any;       // require(...)
  restaurantTitle: string;   // "Хачапури"
  itemsCount: number;        // 3
  total: number;             // 1950
  dateISO: string;           // "2025-10-31T12:00:56"
  items: HistoryDish[];
};

export const ORDER_HISTORY: HistoryOrder[] = [
  {
    id: 'o1',
    restaurantLogo: require('../../assets/images/Hacapuri.png'),
    restaurantTitle: 'Хачапури',
    itemsCount: 3,
    total: 1950,
    dateISO: '2025-10-31T12:00:56',
    items: [
      {
        id: 'o1d1',
        title: 'Долма с бараниной',
        weight: '150/40 гр.',
        price: 650,
        image: require('../../assets/images/dolma.png'),
      },
      { id: 'o1d2', title: 'Долма с бараниной', weight: '150/40 гр.', price: 650, image: require('../../assets/images/dolma.png') },
      { id: 'o1d3', title: 'Долма с бараниной', weight: '150/40 гр.', price: 650, image: require('../../assets/images/dolma.png') },
    ],
  },
  {
    id: 'o2',
    restaurantLogo: require('../../assets/images/Hacapuri.png'),
    restaurantTitle: 'Хачапури',
    itemsCount: 3,
    total: 1950,
    dateISO: '2025-10-28T18:00:56',
    items: [],
  },
  {
    id: 'o3',
    restaurantLogo: require('../../assets/images/Hacapuri.png'),
    restaurantTitle: 'Хачапури',
    itemsCount: 3,
    total: 1950,
    dateISO: '2025-10-07T21:00:56',
    items: [],
  },
];
