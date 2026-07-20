const features = [
  {
    title: "Fast Delivery",
    description: "Delivered to your doorstep in minutes.",
  },
  {
    title: "Fresh Products",
    description: "Handpicked fresh groceries every day.",
  },
  {
    title: "Secure Payment",
    description: "Safe and trusted online payments.",
  },
  {
    title: "Easy Returns",
    description: "Simple replacement and return process.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us section-spacing">
      <div className="section-header">
        <h2 className="text-section-title">
          Why Shop With Us?
        </h2>
      </div>

      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature.title}>

            <div className="why-card__icon">
              Icon
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;