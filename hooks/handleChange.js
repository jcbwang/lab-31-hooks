export default function useHandleChange(event) {
  this.setState({ [e.target.name]: e.target.value });
}
