import PropTypes from 'prop-types';

import { LoadMore } from './Button.styled';

export const Load = ({ loadMore, text }) => {
  return (
    <LoadMore type="button" onClick={loadMore}>
      {text}
    </LoadMore>
  );
};

Load.propTypes = {
  loadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
