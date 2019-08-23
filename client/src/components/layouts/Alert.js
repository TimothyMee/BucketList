import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  var alertArray = [];
  if (alerts !== null && alerts.length > 0) {
    alerts.forEach(alert => {
      alertArray.unshift(
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });
  }
  return alertArray;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(Alert);
//connect takes two parameters in the first bracket
//map state to props and action
// check register for more information
