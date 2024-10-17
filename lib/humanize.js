import moment from 'moment';

export default class Humanize {
  constructor(dataString) {
    this.data = moment(dataString);
  }

  formatDate() {
    return this.data.format('ddd, DD MMM YYYY');
  }

  ago() {
    return this.data.fromNow();
  }
}