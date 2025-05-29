'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RequestItem {
  id: number;
  guestPhone: string;
  requestText: string;
  createdAt: string;
  status: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        'https://travel-studio-intern-backend.vercel.app/api/requests'
      );

      if (Array.isArray(res.data)) {
        setRequests(res.data);
      } else {
        console.error('Expected array but got:', res.data);
        setRequests([]);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pending Guest Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <Card key={req.id} className="bg-white shadow rounded-xl p-4">
              <CardContent className="space-y-2">
                <p>
                  <strong>Phone:</strong> {req.guestPhone}
                </p>
                <p>
                  <strong>Message:</strong> {req.requestText}
                </p>
                <p className="text-sm text-gray-500">
                  Received: {new Date(req.createdAt).toLocaleString()}
                </p>
                
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
