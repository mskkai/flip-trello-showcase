import React from "react";
import NotFoundPage from "../../components/common/NotFoundPage";
import { shallow } from "enzyme";

test("should render Not Found page correctly", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
