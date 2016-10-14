var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        <a href="#"
          onClick={this.readmoreClick}
          className={'news__readmore ' + (visible ? 'none': '')}>
          Подробнее
        </a>
        <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      counter: 0
    }
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong
          className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var Add = React.createClass({
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  getInitialState: function() {
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    console.log('sometext');
  },
  onCheckRuleClick: function (e) {
    this.setState({agreeNotChecked:!e.target.checked});
  },
  onFieldChange: function (fieldName, e) {
    this.setState({[''+fieldName]:!e.target.value.trim()});
  },
  // onCheckText: function (e) {
  //   this.setState({textIsEmpty:!e.target.value.trim()});
  // },
  render: function() {
    return (
      <form>
        <input
          className='add__author'
          defaultValue=''
          placeholder='имя автора'
          ref='author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}/>
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='текст новости'
          ref='text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}/>
        <label>
          <input
            type='checkbox'
            onClick={this.onCheckRuleClick}
            ref='checkrule' />
            Я согласен с правилами
        </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={this.state.authorIsEmpty || this.state.textIsEmpty || this.state.agreeNotChecked}>
          Показать alert
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className='app'>
        <h3>Новости</h3>
        <Add />
        <News data={my_news} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
