import { STATUS_COLORS, BUTTON_TEXTS } from '../constants/bookConstants';

export const getStatusColor = (status) => STATUS_COLORS[status] || STATUS_COLORS.default;

export const getButtonText = (status) => BUTTON_TEXTS[status] || BUTTON_TEXTS.default;

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateBookId = (books) => {
  return Math.max(...books.map(book => book.id), 0) + 1;
}; 