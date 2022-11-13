import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#2752d0"
      wrapperStyle={{ margin: 'auto' }}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#d04fc8"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
