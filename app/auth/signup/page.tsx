'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { signUp } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idDocumentFront, setIdDocumentFront] = useState<string | null>(null);
  const [idDocumentBack, setIdDocumentBack] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Account, 2: ID Verification
  const [captureMode, setCaptureMode] = useState<'front' | 'back' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRefFront = useRef<HTMLInputElement>(null);
  const fileInputRefBack = useRef<HTMLInputElement>(null);

  const handleIDUpload = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (side === 'front') {
        setIdDocumentFront(reader.result as string);
      } else {
        setIdDocumentBack(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async (side: 'front' | 'back') => {
    try {
      setCaptureMode(side);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Could not access camera. Please use file upload instead.');
      setCaptureMode(null);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCaptureMode(null);
  };

  const capturePhoto = (side: 'front' | 'back') => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      if (side === 'front') {
        setIdDocumentFront(dataUrl);
      } else {
        setIdDocumentBack(dataUrl);
      }
      
      stopCamera();
    }
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
      if (!idDocumentFront) {
        setError('Please upload or capture the front of your ID document');
        return;
      }

      if (!idDocumentBack) {
        setError('Please upload or capture the back of your ID document');
        return;
      }

      setLoading(true);

      try {
        // Use the verify-id edge function for ID verification
        const result = await signUp(email, password, idDocumentFront, idDocumentBack);

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
                {/* Camera Video Preview */}
                {captureMode && (
                  <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6">
                    <div className="w-full max-w-md">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg mb-4"
                        style={{ transform: 'scaleX(-1)' }}
                      />
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="flex-1 border border-white/20 py-3 rounded-full font-bold hover:bg-white/5 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => capturePhoto(captureMode)}
                          className="flex-1 bg-white text-black py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
                        >
                          Capture Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Front of ID */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Front of ID</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors">
                    {idDocumentFront ? (
                      <div className="space-y-4">
                        <img
                          src={idDocumentFront}
                          alt="Front of ID"
                          className="w-full h-48 object-contain rounded-lg bg-white/5"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIdDocumentFront(null);
                              fileInputRefFront.current?.click();
                            }}
                            className="flex-1 border border-white/20 py-2 rounded-lg font-medium hover:bg-white/5 transition-colors text-sm"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => startCamera('front')}
                            className="flex-1 border border-white/20 py-2 rounded-lg font-medium hover:bg-white/5 transition-colors text-sm"
                          >
                            Take Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            type="button"
                            onClick={() => fileInputRefFront.current?.click()}
                            className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
                          >
                            Upload Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => startCamera('front')}
                            className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
                          >
                            Take Photo
                          </button>
                        </div>
                        <p className="text-sm text-white/60">
                          Driver's license, passport, or state ID
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRefFront}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIDUpload('front', e)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Back of ID */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Back of ID</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors">
                    {idDocumentBack ? (
                      <div className="space-y-4">
                        <img
                          src={idDocumentBack}
                          alt="Back of ID"
                          className="w-full h-48 object-contain rounded-lg bg-white/5"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIdDocumentBack(null);
                              fileInputRefBack.current?.click();
                            }}
                            className="flex-1 border border-white/20 py-2 rounded-lg font-medium hover:bg-white/5 transition-colors text-sm"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => startCamera('back')}
                            className="flex-1 border border-white/20 py-2 rounded-lg font-medium hover:bg-white/5 transition-colors text-sm"
                          >
                            Take Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            type="button"
                            onClick={() => fileInputRefBack.current?.click()}
                            className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
                          >
                            Upload Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => startCamera('back')}
                            className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
                          >
                            Take Photo
                          </button>
                        </div>
                        <p className="text-sm text-white/60">
                          Driver's license, passport, or state ID
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRefBack}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIDUpload('back', e)}
                      className="hidden"
                    />
                  </div>
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
                    onClick={() => {
                      stopCamera();
                      setStep(1);
                    }}
                    className="flex-1 border border-white/20 py-4 rounded-full font-bold hover:bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !idDocumentFront || !idDocumentBack}
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
