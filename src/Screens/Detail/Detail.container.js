import DetailComponent from './Detail.component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as countActions from '../../Redux/Actions/contacts';

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
});

const ActionCreators = Object.assign({}, countActions);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
