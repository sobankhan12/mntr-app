// Test file for 

import { shallowMount } from "@vue/test-utils";
import Nav from "@/components/Nav/Nav.vue";

describe("Tesing Nav.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "Nav";
    const wrapper = shallowMount(Nav, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
