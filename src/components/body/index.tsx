import './index.css';

interface Props {
  children: React.ReactNode
}
function AppBody(props: Props) {
  return (
    <div className="app-body">
      {props.children}
    </div>
  );
}

export default AppBody;