import * as React from "react";
import SearchUnit from "./search-unit";
import ModalArea from "./modal-area";
const searchIndices = [{ name: `Pages`, title: `Pages` }];

const SearchModal = () => {
	return (
    <ModalArea>
      <SearchUnit indices={searchIndices} />
    </ModalArea>
  );
};
export default SearchModal;
