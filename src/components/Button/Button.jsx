import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Load = ({ loadMore, children }) => {
  return (
    <LoadMore type="button" onClick={loadMore}>
      {children}
    </LoadMore>
  );
};

Load.propTypes = {
  loadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
