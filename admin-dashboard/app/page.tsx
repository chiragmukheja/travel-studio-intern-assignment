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
        'https://d97a-27-255-185-134.ngrok-free.app/api/requests',
        {
          headers: {
            Accept: 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
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

  const resolveRequest = async (id: number) => {
    try {
      await axios.patch(
        `https://d97a-27-255-185-134.ngrok-free.app/api/requests/${id}`,
        {},
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(`Failed to resolve request ${id}:`, err);
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
                <Button onClick={() => resolveRequest(req.id)} className="mt-2">
                  Mark as Resolved
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
