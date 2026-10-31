import { Link } from 'react-router-dom'

export default function EnquiryPrivacy() {
  return (
    <p className="text-xs text-[#f0ece4]/70 leading-relaxed text-center mt-3">
      We respect your privacy. Your enquiry information is used to respond to your request and arrange relevant travel services. Please see our{' '}
      <Link to="/privacy" className="underline underline-offset-4 hover:text-[#f0ece4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Privacy Policy</Link>{' '}
      for details. Hotel names, assigned teachers, facilitators and supplier arrangements are discussed in your consultation after enquiry; relevant final arrangements are provided in your written proposal before payment.
    </p>
  )
}
