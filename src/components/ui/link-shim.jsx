import React from 'react';

const Link = React.forwardRef(function Link({ href = '#', children, className, ...props }, ref) {
  return (
    <a href={href} ref={ref} className={className} {...props}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';
export default Link;
