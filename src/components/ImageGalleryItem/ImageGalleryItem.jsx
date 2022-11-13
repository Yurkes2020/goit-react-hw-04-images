import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export const GalleryItem = ({ image, tag, largeImg, onClick }) => {
  return (
    <>
      <Item>
        <Image onClick={() => onClick(largeImg, tag)} src={image} alt={tag} />
      </Item>
    </>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
