// Test file for Create

import { shallowMount } from "@vue/test-utils";
import Create from "@/views/Create/Create.vue";

describe("Tesing Create.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "Create";
    const wrapper = shallowMount(Create, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
