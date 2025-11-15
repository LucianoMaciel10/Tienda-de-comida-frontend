/* eslint-disable react/react-in-jsx-scope */

interface Props {
  time: string
}

function Time({ time }: Props) {

  return (
    <div className="font-bold text-xxs text-gray-300 absolute left-2 top-2">{time}</div>
  );
};

export default Time;
