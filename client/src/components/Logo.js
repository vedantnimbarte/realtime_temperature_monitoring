const Logo = (props) => (
  <div style={{ margin: 3, alignItems: "center", display: "flex" }}>
    <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
      style={{ height: 60, width: 57 }}
    />
    <p
      style={{
        marginLeft: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "500",
      }}
    >
      Temperature Monitoring System | TPP, Lucknow
    </p>
  </div>
);

export default Logo;
