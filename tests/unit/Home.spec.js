// Test file for Home

import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home/Home.vue";

describe("Tesing Home.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "Home";
    const wrapper = shallowMount(Home, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
