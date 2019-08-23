import { mount } from '@vue/test-utils'
import Component from '../MainUI'

describe('Component', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Component)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})