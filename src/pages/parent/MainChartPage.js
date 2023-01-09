import { Outlet } from "react-router-dom";
import ParentNavbar from '../../components/parent/ParentNavbar'
import ParenttopBoxes from '../../components/parent/ParentTopBoxes'

export default function () {
  return (
    <div className="land-parent">
      <ParentNavbar />
      <div className="parent-land-content">
        <ParenttopBoxes />
      </div>
      <Outlet/>
    </div>
  );
}
