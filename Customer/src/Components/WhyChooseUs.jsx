import {
  Truck,
  Leaf,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    title: "Fast Delivery",
    description: "Fresh groceries delivered quickly to your doorstep.",
    icon: Truck,
  },
  {
    title: "Fresh Products",
    description: "Quality fruits, vegetables and daily essentials.",
    icon: Leaf,
  },
  {
    title: "Secure Payment",
    description: "Safe and secure payment options for every order.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "Simple replacement and hassle-free support.",
    icon: RefreshCcw,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us section-spacing">
      <div className="section-header">
        <h2 className="text-section-title">
          Why Choose QuickCart?
        </h2>
      </div>

      <div className="why-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div className="why-card" key={feature.title}>
              <div className="why-card__icon">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;