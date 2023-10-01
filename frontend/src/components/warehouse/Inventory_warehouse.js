import React, { useEffect, useState } from "react";
import Dashboard_Cards from "../../containers/cards";
import Warehouse_list from "./Warehouse_list";

function Inventory_warehouse() {
  return (
    <div>
      <Dashboard_Cards />
      <Warehouse_list />
    </div>
  );
}

export default Inventory_warehouse;
