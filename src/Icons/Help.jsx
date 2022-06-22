import React from 'react';
import clsx from 'clsx';

const Help = ({ className, ...props }) => {
  return (
    <svg className={clsx('icon', 'icon--help', className)} viewBox="0 0 12 21" {...props}>
      <path d="M6,21 C4.58823236,21 3.44270356,19.8517936 3.44270356,18.4367262 C3.44270356,17.0216587 4.58823236,15.8734523 6,15.8734523 C7.41176764,15.8734523 8.55729644,17.0216587 8.55729644,18.4367262 C8.55729644,19.8517936 7.41176764,21 6,21 Z M9.18157583,11.2069456 C8.15096191,12.1603853 7.86875573,12.5251939 7.86875573,12.9155254 L7.86875573,13.4083489 L4.13124427,13.4083489 L4.13124427,12.9155254 C4.13124427,11.383014 4.79706259,10.2380201 6.10425623,8.96449077 C6.25712546,8.81555839 6.37642392,8.70353896 6.64549936,8.45400956 C7.92976754,7.26501672 8.26248853,6.79204472 8.26248853,6.01402435 C8.26248853,4.76373216 7.24737658,3.7462475 6,3.7462475 C4.75262342,3.7462475 3.73751147,4.76373216 3.73751147,6.01402435 L3.73751147,6.5068479 L0,6.5068479 L0,6.01402435 C0,2.69690318 2.69061416,0 6,0 C9.30938584,0 12,2.69690318 12,6.01402435 C12,7.86514614 11.2560065,9.1989515 9.78981403,10.6327533 C9.61780033,10.8009669 9.48187831,10.9286651 9.18157583,11.2069456 Z"></path>
    </svg>
  );
};

export default Help;
