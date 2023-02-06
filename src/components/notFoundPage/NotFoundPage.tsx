import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      This page doesn&apos;t exist. Return to <Link to="/">main page</Link>
    </div>
  );
};
