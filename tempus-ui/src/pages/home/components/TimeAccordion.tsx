import { ReactNode, useState } from 'react';

import { BiChevronDownCircle } from 'react-icons/bi';
import { AiOutlineClockCircle } from 'react-icons/ai';

import getDuration from 'src/helpers/getDuration';

type TimeAccordionProps = {
  week: string;
  totalTime: number;
  children: ReactNode
};

const TimeAccordion = (props: TimeAccordionProps) => {
  const { totalTime, week, children } = props;

  const [expanded, setExpanded] = useState(false);

  const iconTransform = expanded ? 'rotate(180)' : '';

  return (
    <div className="time-accordion">
      <button onClick={() => setExpanded(!expanded)} className="expand">
        <div className="expand-item">
          <BiChevronDownCircle size="1.5rem" transform={iconTransform} />
          <span>{week}</span>
        </div>
        <div className="expand-item">
          <AiOutlineClockCircle size="1.5rem" />
          <span>{getDuration(totalTime)}</span>
        </div>
      </button>
      <div className={`content ${!expanded && 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};

export default TimeAccordion;