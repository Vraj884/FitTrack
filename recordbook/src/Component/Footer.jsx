export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-6 text-sm">
          <a href="/" aria-label="Home" className="hover:text-white">
            Home
          </a>
          <a href="/bmi" aria-label="BMI Page" className="hover:text-white">
            BMI
          </a>
          <a href="/signup" aria-label="Register Page" className="hover:text-white">
            Register
          </a>
        </div>
      </div>
    </footer>
  );
}
