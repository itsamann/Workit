import {
  ArrowRight,
  Check,
  CheckSquare,
  Users,
  BarChart3,
  Smartphone,
  Zap,
  Target,
  Download,
  Play,
  Github,
  Bell,
  Paperclip,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Workit from "../../assets/Workit.png"; // adjust path as needed

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Workit</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                window.open("https://github.com/itsamann/", "_blank")
              }
              className="hidden md:inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    🚀 Built with MERN Stack
                  </span>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                    Master Your Tasks with
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {" "}
                      Workit
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 max-w-[600px]">
                    A powerful task manager built for teams and individuals.
                    Create, assign, track, and analyze your productivity with
                    intelligent automation and beautiful insights.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/signup")}
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Try Live Demo
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        "https://github.com/itsamann/Workit",
                        "_blank"
                      )
                    }
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-slate-600">
                      Free & Open Source
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm text-slate-600">
                      Mobile Responsive
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-slate-600">
                      Team Collaboration
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    src={Workit}
                    alt="Workit Dashboard Screenshot"
                    width={650}
                    height="auto"
                    className="rounded-2xl shadow-2xl border border-slate-200"
                  />
                </div>
                <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                Features
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900">
                Everything you need to stay productive
              </h2>
              <p className="text-xl text-slate-600 max-w-[800px] mx-auto">
                Comprehensive task management with intelligent automation, team
                collaboration, and powerful analytics.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CheckSquare,
                  title: "Smart Task Management",
                  description:
                    "Create, update, and organize tasks with due dates, priorities, and automated status updates based on progress.",
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description:
                    "Assign tasks to team members, track completion, and receive real-time updates on project progress.",
                },
                {
                  icon: BarChart3,
                  title: "Analytics & Insights",
                  description:
                    "Visual analytics with charts and graphs to track productivity and identify improvement areas.",
                },
                {
                  icon: Target,
                  title: "Priority Management",
                  description:
                    "Categorize tasks by priority levels (Low, Medium, High, Urgent) with visual indicators and smart sorting.",
                },
                {
                  icon: Bell,
                  title: "Automated Reminders",
                  description:
                    "Smart notifications for overdue tasks and upcoming deadlines to keep you on track.",
                },
                {
                  icon: Paperclip,
                  title: "File Attachments",
                  description:
                    "Upload and manage task-related files with easy access for reference and collaboration.",
                },
                {
                  icon: Download,
                  title: "Export Reports",
                  description:
                    "Download comprehensive task reports for analysis, tracking, and external sharing.",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Responsive",
                  description:
                    "Seamless experience across desktop, tablet, and mobile devices with responsive design.",
                },
                {
                  icon: Zap,
                  title: "MERN Stack Power",
                  description:
                    "Built with MongoDB, Express, React, and Node.js for robust performance and scalability.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 tracking-wide">
                Technology
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                Built with Modern Tech Stack
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Powered by the MERN stack for optimal performance and
                scalability.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
              {[
                {
                  name: "MongoDB",
                  description: "Database",
                  color: "from-green-600 to-green-700",
                  logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
                },
                {
                  name: "Express.js",
                  description: "Backend",
                  color: "from-gray-700 to-gray-900",
                  logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
                },
                {
                  name: "React.js",
                  description: "Frontend",
                  color: "from-blue-600 to-blue-700",
                  logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                },
                {
                  name: "Node.js",
                  description: "Runtime",
                  color: "from-green-700 to-green-800",
                  logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
                },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.05] hover:shadow-xl cursor-default"
                >
                  <div
                    className={`flex items-center justify-center rounded-full bg-gradient-to-br ${tech.color} w-20 h-20 mb-6`}
                  >
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-12 h-12 object-contain filter drop-shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-slate-600 text-sm tracking-wide">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to boost your productivity?
              </h2>
              <p className="text-xl opacity-90">
                Join the open-source community and start managing your tasks
                more efficiently with Workit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-white text-blue-600 hover:bg-slate-100 rounded-lg transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  Try Live Demo
                </button>
                <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-white text-white hover:bg-white hover:text-blue-600 rounded-lg transition-all duration-200">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5" />
                  <span>100% Free & Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5" />
                  <span>MIT License</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5" />
                  <span>Active Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Stay Updated
              </h3>
              <p className="text-slate-600">
                Get notified about new features, updates, and productivity tips
                for Workit.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
              <p className="text-xs text-slate-500">
                By subscribing, you agree to receive updates about Workit
                development.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Workit</span>
              </div>
              <p className="text-slate-400 max-w-xs">
                Open-source task management built with the MERN stack. Boost
                your productivity with intelligent automation.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="hover:text-white transition-colors"
                  >
                    Live Demo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Issues
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discussions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Developer</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Workit. Open source under MIT
              License.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                MIT License
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
