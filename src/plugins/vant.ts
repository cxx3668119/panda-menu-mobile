import { App as VM } from 'vue'
import {
  Button,
  Cell,
  CellGroup,
  Icon,
  Tabbar,
  Col,
  Row,
  TabbarItem,
  Form,
  Field,
  Image as VanImage
} from 'vant'

const plugins = [Button, Icon, Cell, CellGroup, Tabbar, Col, Row, TabbarItem, Form, Field, VanImage]

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  }
}
