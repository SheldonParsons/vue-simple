import classNames from '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'Sheldon'
    }
  },
  render() {
    // 使用jsx的写法的好处在于，可以在这里做任何的javascript的运算
    // 不好的地方在于，没有style标签，样式需要从外部引入
    // 使用jsx更开放，功能更强大，使用vue结构更清晰，编码更方便
    return (
    // 使用vue modules的方式去命名classname
      <div id={classNames.footer}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
