'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { signUp } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idDocument, setIdDocument] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Account, 2: ID Verification

  const handleIDUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setIdDocument(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      // Validate passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }

      // Move to ID verification
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!idDocument) {
        setError('Please upload a valid ID document');
        return;
      }

      setLoading(true);

      try {
        const result = await signUp(email, password, idDocument);

        if (result.error) {
          setError(result.error);
          setLoading(false);
          return;
        }

        if (result.success) {
          // Show success message
          alert(
            result.id_verified
              ? 'Account created and ID verified! Redirecting to dashboard...'
              : 'Account created! ID verification pending. You can still access your account.'
          );

          // Redirect to login
          router.push('/auth/login');
        }
      } catch (err: any) {
        setError(err.message || 'Signup failed');
        setLoading(false);
      }
    }
  };

  return (
    <main className="bg-black text-white antialiased min-h-screen">
      <Navigation />

      <section className="py-24">
        <div className="max-w-md mx-auto px-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/20'}`} />
            <div className="w-16 h-0.5 bg-white/20" />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/20'}`} />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              {step === 1 ? 'Create Account' : 'Verify Your Identity'}
            </h1>
            <p className="text-white/60">
              {step === 1
                ? 'Join CU.APP and access banking infrastructure'
                : 'Upload a valid government-issued ID'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-white/40 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-white/90 transition-colors"
                >
                  Continue to ID Verification →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIDUpload}
                    className="hidden"
                    id="id-upload"
                  />
                  <label htmlFor="id-upload" className="cursor-pointer">
                    {idDocument ? (
                      <div className="space-y-4">
                        <svg
                          className="w-16 h-16 mx-auto text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <div>
                          <p className="font-medium">ID Document Uploaded</p>
                          <p className="text-sm text-white/60 mt-1">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <svg
                          className="w-16 h-16 mx-auto text-white/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <div>
                          <p className="font-medium">Upload Government ID</p>
                          <p className="text-sm text-white/60 mt-1">
                            Driver's license, passport, or state ID
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/60">
                  <p className="font-medium text-white mb-2">Why we need this:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Comply with financial services regulations</li>
                    <li>• Prevent fraud and unauthorized access</li>
                    <li>• Protect your account security</li>
                    <li>• Your data is encrypted and never shared</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-white/20 py-4 rounded-full font-bold hover:bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !idDocument}
                    className="flex-1 bg-white text-black py-4 rounded-full font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-sm text-white/60">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              Protected by Supabase Auth with ID verification via Edge Functions
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
