// Test file for 

import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer/Footer.vue";

describe("Tesing Footer.vue", () => {

  it("renders props.msg when passed", () => {
    const msg = "Footer";
    const wrapper = shallowMount(Footer, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

});
